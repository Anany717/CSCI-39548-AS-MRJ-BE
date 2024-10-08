import { Employee } from './Employee.js';
import { Task } from './Task.js';

Task.belongsTo(Employee);
Employee.hasMany(Task);

async function seedDb() {
  try {
    const employee1 = await Employee.create({
      firstname: "Manny",
      lastname: "Reyes",
      department: "Computer Science",
    });
    const employee2 = await Employee.create({
      firstname: "John",
      lastname: "Snow",
      department: "History",
    });

    const task1 = await Task.create({
      content: "Say Ma' Queen ",
      priority: 2,
      completed: true,
    });
    const task2 = await Task.create({
      content: "write code",
      priority: 4,
      completed: false,
    });

    await task1.setEmployee(employee2);
    await task2.setEmployee(employee1);

  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// Export models and seed function
export {
  Employee,
  Task,
  seedDb
};
