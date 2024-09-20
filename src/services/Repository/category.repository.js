export default class CategoryRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAllCategory = async () => {
    return this.dao.getAllCategory();
  };
  saveCategory = async (category) => {
    return this.dao.saveCategory(category);
  };
  updateCategory = async (id,category) => {
    return this.dao.updateCategory(id,category);
  };
  deleteCategory = async (id) => {
    return this.dao.deleteCategory(id);
  };
}
