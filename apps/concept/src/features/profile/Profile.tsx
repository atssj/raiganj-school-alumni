import React, { useState } from 'react';
import { Camera, Save, MapPin, Briefcase, GraduationCap, User } from 'lucide-react';
import { Button } from '../../shared/components';
import { useAuth } from '../auth/components/ProtectedRoute';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Rahul C.',
    batch: user?.batch || 2010,
    profession: user?.profession || 'Software Engineer',
    location: user?.location || 'Raiganj, WB',
    avatar: user?.avatar || 'https://picsum.photos/id/1012/200/200',
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-fade-in pb-12">
      <h2 className="text-2xl font-serif font-bold text-gray-900">My Profile</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <img
              src={formData.avatar}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera className="w-8 h-8" />
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">Click to upload new photo (Simulated)</p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              icon={User}
              value={formData.name}
              onChange={value => updateField('name', value)}
            />
            <InputField
              label="Batch Year"
              icon={GraduationCap}
              type="number"
              value={formData.batch.toString()}
              onChange={value => updateField('batch', parseInt(value) || 0)}
            />
            <InputField
              label="Profession"
              icon={Briefcase}
              value={formData.profession}
              onChange={value => updateField('profession', value)}
            />
            <InputField
              label="Current City"
              icon={MapPin}
              value={formData.location}
              onChange={value => updateField('location', value)}
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={e => updateField('avatar', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm text-gray-600 transition-all text-base md:text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
            {successMsg ? (
              <span className="text-green-600 font-medium text-sm animate-fade-in flex items-center gap-2">
                <Save className="w-4 h-4" /> {successMsg}
              </span>
            ) : (
              <span />
            )}
            <Button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Sub-component
interface InputFieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon: Icon, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
      />
    </div>
  </div>
);
