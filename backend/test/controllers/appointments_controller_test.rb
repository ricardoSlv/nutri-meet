require "test_helper"

class AppointmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @appointment = appointments(:emiliaPereira)
    @accepted_appointment = appointments(:emiliaPereiraAccepted)
    @collision_appointment1 = appointments(:gabrielLima)
    @collision_appointment2 = appointments(:patriciaSilva)
    @collision_appointment3 = appointments(:rafaelCosta)
  end

  test "should get index" do
    get appointments_url
    assert_response :success
    response_body = JSON.parse(response.body)
    assert_not_nil response_body["appointments"]
    assert_not_nil response_body["count"]
  end

  test "should get index with nutritionist filter" do
    get appointments_url, params: { nutritionist_id: @appointment.nutritionist_id }
    assert_response :success
    response_body = JSON.parse(response.body)
    assert_not_nil response_body["appointments"]
    assert_not_nil response_body["count"]
  end

  test "should filter index with status filter" do
    get appointments_url, params: { status: "pending" }
    assert_response :success
    response_body = JSON.parse(response.body)

    response_body["appointments"].each do |appointment|
        assert_equal appointment["status"], "pending"
    end
  end

  test "should create appointment successfully" do
    assert_difference('Appointment.count') do
      post appointments_url, params: {
        appointment: {
          guest_name: "John Doe",
          guest_email: "john.doe@example.com",
          datetime: "2025-09-01 10:00:00",
          nutritionist_id: @appointment.nutritionist_id,
          service_id: @appointment.service_id
        }
      }
    end

    assert_response :created

    response_body = JSON.parse(response.body)

    assert_equal "John Doe", response_body["guest_name"]
    assert_equal "john.doe@example.com", response_body["guest_email"]
    assert_equal "pending", response_body["status"]
  end

  test "should not create appointment with invalid email" do
    assert_no_difference('Appointment.count') do
      post appointments_url, params: {
        appointment: {
          guest_name: " User",
          datetime: "2025-09-01 13:00:00",
          guest_email: "invalid-email",
          nutritionist_id: @appointment.nutritionist_id,
          service_id: @appointment.service_id
        }
      }
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert_not_nil response_body["errors"]
  end


  test "should delete existing pending appointments for same guest email when creating a new one" do
    # Create a pending appointment for a specific email
    pending_appointment = Appointment.create!(
      guest_name: "Pending User",
      guest_email: "same.email@example.com",
      datetime: "2025-09-01 11:00:00",
      nutritionist_id: @appointment.nutritionist_id,
      service_id: @appointment.service_id,
      status: "pending"
    )

    # Verify the pending appointment exists
    assert Appointment.where(guest_email: "same.email@example.com", status: "pending").exists?

    # Create a new appointment with the same email
    post appointments_url, params: {
      appointment: {
        guest_name: "New User",
        guest_email: "same.email@example.com",
        datetime: "2025-09-01 12:00:00",
        nutritionist_id: @appointment.nutritionist_id,
        service_id: @appointment.service_id
      }
    }

    assert_response :created

    response_body = JSON.parse(response.body)
    
    # Verify the old pending appointment was deleted
    assert_not Appointment.where(guest_email: "same.email@example.com", status: "pending").where.not(id: response_body["id"]).exists?
  end

  test "should reject other pending appointments for the same time and nutritionist when one is accepted" do
    # Create multiple pending appointments for the same time and nutritionist
    nutritionist_id = @collision_appointment1.nutritionist_id
    datetime = @collision_appointment1.datetime

    # Verify we have multiple pending appointments for the same time
    pending_count = Appointment.where(
      nutritionist_id: nutritionist_id,
      datetime: datetime,
      status: "pending"
    ).count
    assert pending_count > 1, "Should have multiple pending appointments for testing"

    # Accept one of the appointments
    appointment_to_accept = Appointment.where(
      nutritionist_id: nutritionist_id,
      datetime: datetime,
      status: "pending"
    ).first

    patch appointment_url(appointment_to_accept), params: {
      appointment: { status: "accepted" }
    }

    assert_response :ok

    # Verify that all other pending appointments for the same time are now rejected
    other_appointments_for_same_time = Appointment.where(
      nutritionist_id: nutritionist_id,
      datetime: datetime,
      status: "rejected"
    ).where.not(id: appointment_to_accept.id)

    other_appointments_for_same_time.each do |appointment|
      assert_equal "rejected", appointment.status, "Appointment #{appointment.id} should be rejected after accepting same timeappointment #{appointment_to_accept.id}"
    end

  
    appointment_to_accept.reload
    assert_equal "accepted", appointment_to_accept.status
  end

  test "should not create appointment while there is an accepted appointment for same nutritionist and time" do
    existing_accepted_appointment = appointments(:emiliaPereiraAccepted)
    
    assert_no_difference('Appointment.count') do
      post appointments_url, params: {
        appointment: {
          guest_name: "Collision Test User",
          guest_email: "collision.test@example.com",
          datetime: existing_accepted_appointment.datetime,
          nutritionist_id: existing_accepted_appointment.nutritionist_id,
          service_id: existing_accepted_appointment.service_id
        }
      }
    end

    assert_response :unprocessable_entity
    response_body = JSON.parse(response.body)
    assert_equal "Time already booked for nutritionist", response_body["errors"]["datetime"]
  end

end
