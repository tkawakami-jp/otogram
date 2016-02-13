class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.references :owner, index: true, null: false
      t.string :name

      t.timestamps null: false
    end
  end
end
