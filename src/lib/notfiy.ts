import toast from 'react-hot-toast';

export const notify = {
  normal: (message: string) => toast(message),
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  remove: (id: string) => toast.remove(id),
  custom: () => toast.custom('', { style: { display: 'none' } }),
} as const;
