'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== 'image') formData.append(key, data[key]);
      });
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const res = await fetch('/api/schools', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setStatus({ ok: true, msg: 'School saved successfully!' });
      reset();
    } catch (e) {
      setStatus({ ok: false, msg: e.message });
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="School Name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <small style={{ color: 'red' }}>{errors.name.message}</small>}

        <input placeholder="Address" {...register('address', { required: 'Address is required' })} />
        {errors.address && <small style={{ color: 'red' }}>{errors.address.message}</small>}

        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <input placeholder="City" {...register('city', { required: 'City is required' })} />
            {errors.city && <small style={{ color: 'red' }}>{errors.city.message}</small>}
          </div>
          <div>
            <input placeholder="State" {...register('state', { required: 'State is required' })} />
            {errors.state && <small style={{ color: 'red' }}>{errors.state.message}</small>}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <input placeholder="Contact Number"
              {...register('contact', {
                required: 'Contact is required',
                pattern: { value: /^\d{7,15}$/, message: 'Enter a valid number (7-15 digits)' }
              })}
            />
            {errors.contact && <small style={{ color: 'red' }}>{errors.contact.message}</small>}
          </div>
          <div>
            <input placeholder="Email"
              {...register('email_id', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
              })}
            />
            {errors.email_id && <small style={{ color: 'red' }}>{errors.email_id.message}</small>}
          </div>
        </div>

        <div>
          <input type="file" accept="image/*" {...register('image', { required: 'Image is required' })} />
          {errors.image && <small style={{ color: 'red' }}>{errors.image.message}</small>}
        </div>

        <button type="submit" style={{ padding: '10px 14px', cursor: 'pointer' }}>Save School</button>
      </form>

      {status && (
        <p style={{ color: status.ok ? 'green' : 'red', marginTop: 8 }}>{status.msg}</p>
      )}

      <style jsx>{`
        input, button {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        @media (max-width: 640px) {
          form > div[style] { gridTemplateColumns: none !important; }
        }
      `}</style>
    </div>
  );
}
