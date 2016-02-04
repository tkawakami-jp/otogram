class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, null: false, default: ""
    add_column :users, :invited_by_id, :integer
  end
end
