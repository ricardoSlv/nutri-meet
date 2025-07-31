class Appointment < ApplicationRecord
    belongs_to :nutritionist
    belongs_to :service

    # validates :nutritionist_id, presence: true
    validates :datetime, presence: true
    validates :guest_name, presence: true, length: { minimum: 3 }
    validates :guest_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :status, presence: true

    enum :status, { pending: "pending", accepted: "accepted", rejected: "rejected" }, default: "pending"
end
