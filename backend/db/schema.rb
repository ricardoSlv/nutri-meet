# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_28_180806) do
  create_table "appointments", force: :cascade do |t|
    t.string "guest_name", null: false
    t.string "guest_email", null: false
    t.datetime "datetime", null: false
    t.string "status", default: "pending", null: false
    t.integer "service_id", null: false
    t.integer "nutritionist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guest_email"], name: "index_appointments_on_guest_email", unique: true
    t.index ["nutritionist_id"], name: "index_appointments_on_nutritionist_id"
    t.index ["service_id"], name: "index_appointments_on_service_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "address", null: false
    t.string "municipality", null: false
    t.string "district", null: false
    t.string "zipcode", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nutritionists", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "services", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "price", precision: 10, scale: 2
    t.integer "location_id", null: false
    t.integer "nutritionist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_services_on_location_id"
    t.index ["nutritionist_id"], name: "index_services_on_nutritionist_id"
  end

  add_foreign_key "appointments", "nutritionists"
  add_foreign_key "appointments", "services"
  add_foreign_key "services", "locations"
  add_foreign_key "services", "nutritionists"
end
