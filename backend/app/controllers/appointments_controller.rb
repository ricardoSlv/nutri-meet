class AppointmentsController < ApplicationController
  def index
    if params[:nutricionist_id].present?
      @appointments = Appointment.includes(:nutricionist).where(nutricionist_id: params[:nutricionist_id])
    else
      @appointments = Appointment.includes(:nutricionist).all
    end
    
    render json: {
      appointments: @appointments,
      count: @appointments.count
    }
  end


  def create
    @new_appointment = Appointment.new(create_appointment_params)

    if Appointment.where(
        nutricionist_id: @new_appointment.nutricionist_id,
        datetime: @new_appointment.datetime,
        status: "accepted",
    ).exists?
      render json: { errors: "Time already booked for nutricionist" }, status: :unprocessable_entity
      return
    end

    Appointment.where(
        guest_email: @new_appointment.guest_email, 
        status: "pending"
    ).destroy_all

    if @new_appointment.save
      render json: @new_appointment, status: :created
    else
      render json: { errors: @new_appointment.errors }, status: :unprocessable_entity
    end
  end


  def update
    @appointment = Appointment.find(params[:id])
    @appointment.status = update_appointment_status_params[:status]
    
    if @appointment.save
      if @appointment.status == "accepted"
        AppointmentMailer.with(appointment: @appointment).accepted_appointment_email.deliver_now

        @same_time_appointments = Appointment
        .where(nutricionist_id: @appointment.nutricionist_id, datetime: @appointment.datetime, status: "pending")
        
        @same_time_appointments.each do |appointment|
            AppointmentMailer.with(appointment: appointment).rejected_appointment_email.deliver_now
        end

        @same_time_appointments.update_all(status: "rejected")
      end

      render json: @appointment, status: :ok
    else
      render json: { errors: @appointment.errors }, status: :unprocessable_entity
    end
  end
  private 

  def update_appointment_status_params
    params.require(:appointment).permit(:status)
  end

  def create_appointment_params
    params.require(:appointment).permit(:guest_name, :guest_email, :datetime, :nutricionist_id, :service_id)
  end
end
