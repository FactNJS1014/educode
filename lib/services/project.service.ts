import { db } from '../db/store';
import type { Project, UserProject } from '../types';

export class ProjectService {
  static async getAllProjects(userId?: string): Promise<Project[]> {
    const projects = await db.getAllProjects();
    return Promise.all(
      projects.map(async p => {
        let userStatus: any = 'NOT_STARTED';
        let userProgress = 0;

        if (userId) {
          const up = await db.getUserProject(userId, p.id);
          if (up) {
            userStatus = up.status;
            userProgress = up.progress;
          }
        }

        return {
          ...p,
          userStatus,
          userProgress,
        };
      })
    );
  }

  static async getProjects(userId?: string): Promise<Project[]> {
    return this.getAllProjects(userId);
  }

  static async getProjectById(projectId: string, userId?: string): Promise<Project | null> {
    const project = await db.getProjectById(projectId);
    if (!project) return null;

    let userStatus: any = 'NOT_STARTED';
    let userProgress = 0;
    let completedSteps: string[] = [];

    if (userId) {
      const up = await db.getUserProject(userId, project.id);
      if (up) {
        userStatus = up.status;
        userProgress = up.progress;
        completedSteps = up.completedSteps || [];
      }
    }

    const stepsWithCompletion = (project.steps || []).map(step => ({
      ...step,
      completed: completedSteps.includes(step.id),
    }));

    return {
      ...project,
      steps: stepsWithCompletion,
      userStatus,
      userProgress,
    };
  }

  static async toggleStep(userId: string, projectId: string, stepId: string, completed: boolean): Promise<UserProject> {
    return await db.updateUserProjectStep(userId, projectId, stepId, completed);
  }
}
