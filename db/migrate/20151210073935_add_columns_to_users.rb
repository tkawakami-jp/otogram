class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :deleted_at, :datetime
    add_column :users, :invited_by_id, :integer
    add_column :users, :username, :string, null: false, default: ""
  end
end
