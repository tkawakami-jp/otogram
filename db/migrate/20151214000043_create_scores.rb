class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.references :user, index: true, foreign_key: true
      t.string :name
      t.text :data

      t.timestamps null: false
      t.index [:user_id, :created_at]
    end
  end
end
