import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const MainInstance = {
  async query(resource: any, params: any) {
    return instance.get(resource, params);
  },

  async download(resource: any, params: any, type: any) {
    return instance.get(resource, { params, responseType: type });
  },

  async fetch(resource: any, slug: string = "", params: any) {
    return instance.get(`${resource}/${slug}`, params);
  },

  async post(resource: any, params: any, config: any) {
    return instance.post(`${resource}`, params, config);
  },

  async create(resource: any, slug: string = "", params: any, config: any) {
    return instance.post(`${resource}/${slug}`, params, config);
  },

  async update(resource: any, slug: any, params: any) {
    return instance.put(`${resource}/${slug}`, params);
  },

  async put(resource: any, params: any, config: any) {
    return instance.put(`${resource}`, params, config);
  },

  async delete(resource: any, config: any) {
    return instance.delete(resource, config);
  },

  async deleteSlug(resource: any, slug: string = "", config: any) {
    return instance.delete(`${resource}/${slug}`, config);
  },
};

export default MainInstance;
