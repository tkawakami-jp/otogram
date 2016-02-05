class CreateWaits < ActiveRecord::Migration
  def change
    create_table :waits do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
