class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :points, default: 1000

      t.timestamps
    end
  end
end
