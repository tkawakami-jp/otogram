class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.string :email
      t.string :token
      t.timestamps null: false
    end
  end
end
