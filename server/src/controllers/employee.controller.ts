import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service';

export const EmployeeController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const employee = await EmployeeService.findByUserId(userId);
      
      if (!employee) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      return res.json(employee);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};