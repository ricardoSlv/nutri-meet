class AppointmentMailerPreview < ActionMailer::Preview
  def accepted_appointment_email
    appointment = Appointment.first
    AppointmentMailer.with(appointment: appointment).accepted_appointment_email
  end
end