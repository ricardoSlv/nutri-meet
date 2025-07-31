class CreateAppointments < ActiveRecord::Migration[8.0]
  def change
    create_table :appointments do |t|
      t.string :guest_name, null: false
      t.string :guest_email, null: false
      t.datetime :datetime, null: false
      t.string :status, default: 'pending', null: false

      t.references :service, null: false, foreign_key: true
      t.references :nutritionist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
