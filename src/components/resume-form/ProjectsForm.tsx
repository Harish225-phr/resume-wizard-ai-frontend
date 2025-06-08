
import React from 'react';
import { Code, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormData, Project } from '@/types/resume';

interface ProjectsFormProps {
  formData: FormData;
  handleProjectChange: (index: number, field: keyof Project, value: string) => void;
  addProject: () => void;
  removeProject: (index: number) => void;
}

const ProjectsForm = ({ formData, handleProjectChange, addProject, removeProject }: ProjectsFormProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Code className="mr-3 h-6 w-6 text-indigo-600" />
          Projects (Optional)
        </h2>
        <Button
          type="button"
          onClick={addProject}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {formData.projects.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-xl p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Project {index + 1}</h3>
            <Button
              type="button"
              onClick={() => removeProject(index)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., E-commerce Website"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Project Link
              </label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe the project, technologies used, and key features..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
