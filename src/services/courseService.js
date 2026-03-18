// src/services/courseService.js
import api from './api'

export const courseService = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  getLearners: (id) => api.get(`/courses/${id}/learners`),
  addLearner: (id, learnerId) => api.post(`/courses/${id}/learners`, { learnerId }),
  removeLearner: (id, learnerId) => api.delete(`/courses/${id}/learners/${learnerId}`),
}