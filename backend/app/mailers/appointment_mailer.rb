class AppointmentMailer < ApplicationMailer
  def accepted_appointment_email
    @appointment = params[:appointment]
    @guest_name = @appointment.guest_name
    @datetime = @appointment.datetime
    @nutritionist = @appointment.service.nutritionist
    @service = @appointment.service
    mail(
      to: @appointment.guest_email,
      subject: "Your appointment has been accepted!"
    )
  end
end 