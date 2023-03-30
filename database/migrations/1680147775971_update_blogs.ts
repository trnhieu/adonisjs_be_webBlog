import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateBlogs extends BaseSchema {
  protected tableName = 'blogs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
