class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.references :score, index: true, null: false
      t.references :user, index: true, null: false
      t.text :data

      t.timestamps null: false
    end
  end
end
