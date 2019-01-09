// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

class StudentService {
  getStudents(): Promise<Student[]> {
    return axios.get('/students');
  }

  getStudent(id: number): Promise<Student> {
    return axios.get('/students/' + id);
  }

  updateStudent(student: Student): Promise<void> {
    return axios.put('/students', student);
  }
}

class Event {
  event_id: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  time_start: string;
  time_end: string;
}

class EventService{
  getEvents(): Promise<Event[]> {
    return axios.get('/events');
  }
  getEvent(event_id: number): Promise<Event> {
    return axios.get('/events/'+event_id);
  }
  updateEvent(event: Event): Promise<void> {
    return axios.put('/events', Event);
  }
}
class Category {
  category_id: number;
  name: string;
}

class CategoryService{
  getCategories(): Promise<Category[]> {
    return axios.get('/categories');
  }
  getCategory(category_id: number): Promise<Category> {
    return axios.get('/categories/'+category_id);
  }
  updateCategory(category: Category): Promise<void> {
    return axios.put('/categories', Category);
  }
}

export let studentService = new StudentService();
