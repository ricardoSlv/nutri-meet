class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.includes(:service)


    if params[:nutritionist_id].present?
      @appointments = @appointments.where(nutritionist_id: params[:nutritionist_id], status: params[:status])
    end

    if params[:status].present?
      @appointments = @appointments.where(status: params[:status])
    end
    
    render json: {
      appointments: @appointments.as_json(include: { service: { include: :nutritionist } }),
      count: @appointments.count
    }
  end


  def create
    @new_appointment = Appointment.new(create_appointment_params)

    if Appointment.where(
        nutritionist_id: @new_appointment.nutritionist_id,
        datetime: @new_appointment.datetime,
        status: "accepted",
    ).exists?
      render json: { errors: "Time already booked for nutritionist" }, status: :unprocessable_entity
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
        .where(nutritionist_id: @appointment.nutritionist_id, datetime: @appointment.datetime, status: "pending")
        
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

  def index_params
    params.permit(:nutritionist_id, :status)
  end

  def update_appointment_status_params
    params.require(:appointment).permit(:status)
  end

  def create_appointment_params
    params.require(:appointment).permit(:guest_name, :guest_email, :datetime, :nutritionist_id, :service_id)
  end
end
