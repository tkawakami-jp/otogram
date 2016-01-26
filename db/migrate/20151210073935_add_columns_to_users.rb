class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :deleted_at, :datetime
    add_column :users, :username, :string, null: false, default: ""
    add_index :users, :deleted_at
  end
end
