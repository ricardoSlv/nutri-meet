class CreateNutritionists < ActiveRecord::Migration[8.0]
  def change
    create_table :nutritionists do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :website

      t.timestamps
    end
  end
end
