import express from "express";
import * as Admin from "../Controller/Admin_controller.js";
import * as Task from "../Controller/Task_Controller.js";
import * as User from "../Controller/User_Controller.js";
import * as Ticket from "../Controller/Ticket_controller.js";

const adminRoute = express.Router();

adminRoute.post("/login", Admin.admin_check);
adminRoute.post("/dashboard", Admin.authMiddleware, Admin.admin_dashboard);
adminRoute.post("/createTask", Admin.authMiddleware, Task.createTask);
adminRoute.post("/updateTask", Admin.authMiddleware, Task.updateTask);
adminRoute.post("deleteTask",Admin.authMiddleware,Task.deleteTask)
adminRoute.post("/editStatus", Task.editTaskStatus);
adminRoute.post("/getAllTask", Task.getAllTask);
adminRoute.post("/getTask", Task.getTask);
adminRoute.post("/getEmpMails", User.getAllUserEmpMail);
adminRoute.post("/create", Admin.authMiddleware, User.createUser);
adminRoute.post("/update", Admin.authMiddleware, User.updateUser);
adminRoute.post("/delete", Admin.authMiddleware, User.deleteUser);
adminRoute.post("/findById", Admin.authMiddleware, User.findById);
adminRoute.post("/createTicket",Ticket.createTicket);
adminRoute.post("/updateTicket", Admin.authMiddleware, Ticket.updateTicket);
adminRoute.post("deleteTicket",Admin.authMiddleware,Ticket.deleteTicket);
adminRoute.post("/getAllTicket", Admin.authMiddleware, Ticket.getAllTicket);
adminRoute.post("/getTicketById", Ticket.getTicketById);
adminRoute.post(
  "/getTicketByCategory",
  Admin.authMiddleware,
  Ticket.getTicketByCategory
);
adminRoute.post(
  "/create_skill_Improvement",
  User.authMiddleware,
  Task.create_skill_Improvement
);
adminRoute.post(
  "/update_skill_Improvement",
  User.authMiddleware,
  Task.update_skill_Improvement
);
adminRoute.post(
  "/createGrowthAssessment",
  User.authMiddleware,
  Task.create_growth_assessment
);
adminRoute.post(
  "/updateGrowthAssessment",
  User.authMiddleware,
  Task.update_growth_assessment
);

export default adminRoute;
