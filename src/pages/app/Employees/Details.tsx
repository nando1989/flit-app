/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { ArrowLeft, SquareUserRound, Trash2 } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { SelectDate } from '@/components/SelectDate';
import { formatFirebaseDateToDate, formattedCEP, formattedCPF } from '@/lib/utils';
import { statesOfBrazil } from '@/models/appTypes';
import { ROUTES } from '@/paths';
import { getEmployees, postEmployee } from '@/service/firebase/firestore/employees';
import { uploadFileStorageFirebase } from '@/service/firebase/storage/storage';

import { initFormEmployees, schemaValidationFormEmployees } from './types';

export const EmployeesDetails = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const employeeId = params?.get('id');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<{ file: File | null; url: string }>({
    file: null,
    url: '',
  });

  useLayoutEffect(() => {
    (async () => {
      if (employeeId) {
        setLoading(true);
        await getEmployees(employeeId)
          .then((data) => {
            if (data?.photoUrl) setPreviewAvatar({ file: null, url: data.photoUrl });
            formik.setValues({
              name: data?.name ?? '',
              email: data?.email ?? '',
              document: data?.document ?? '',
              street: data?.address.street ?? '',
              zipCode: data?.address.zipCode ?? '',
              neighborhood: data?.address.neighborhood ?? '',
              city: data?.address.city ?? '',
              state: data?.address.state ?? '',
              hireDate: data?.hireDate
                ? dayjs(formatFirebaseDateToDate(data?.hireDate)).toString()
                : '',
            });
          })
          .finally(() => setLoading(false));
      }
    })();
  }, [employeeId]);

  const formik = useFormik({
    initialValues: initFormEmployees,
    validationSchema: schemaValidationFormEmployees,
    onSubmit: (data) => handleSubmitForm(data),
  });

  const handleSubmitForm = async (data: typeof initFormEmployees) => {
    setLoading(true);

    let photoUrl = '';
    try {
      if (previewAvatar?.file) {
        photoUrl = await uploadFileStorageFirebase({
          file: previewAvatar?.file,
          path: `${data.email}-${data.document}`,
        });
      }

      await postEmployee({
        id: employeeId ?? undefined,
        photoUrl: photoUrl,
        address: {
          street: data.street,
          city: data.city,
          neighborhood: data.neighborhood,
          state: data.state,
          zipCode: data.zipCode,
        },
        document: data.document,
        email: data.email,
        hireDate: data.hireDate as unknown as Date,
        isActive: true,
        name: data.name,
      });

      navigate(ROUTES.AUTHENTICATED.EMPLOYEES);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);

      const url = URL.createObjectURL(file);
      setPreviewAvatar({
        file,
        url,
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Button
        onClick={() => !loading && navigate(ROUTES.AUTHENTICATED.EMPLOYEES)}
        lefIcon={<ArrowLeft className="self-s mr-2 size-4" />}
        label="Voltar"
        variant="link"
        className="mb-2 self-start"
      />
      <form onSubmit={formik.handleSubmit} className="grid w-full max-w-xl gap-2">
        <div className="col-span-1 col-start-2 mb-4">
          <button
            type="button"
            className="flex h-20 w-20 cursor-pointer items-center justify-center justify-self-end rounded-lg border bg-slate-200 hover:opacity-80"
            onClick={handleButtonClick}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {previewAvatar?.url ? (
              <img
                src={previewAvatar.url}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <SquareUserRound className="size-8 text-slate-500" />
            )}
          </button>

          {previewAvatar?.url && (
            <button
              type="button"
              className="mt-2 flex cursor-pointer flex-col items-center gap-2 justify-self-end"
              onClick={() =>
                setPreviewAvatar({
                  file: null,
                  url: '',
                })
              }
            >
              <span className="text-sm text-red-700">Remover</span>
              <Trash2 className="size-4 text-red-600" />
            </button>
          )}
        </div>

        <Input
          disabled={loading}
          value={formik.values.name}
          onError={formik.errors.name}
          onChange={formik.handleChange('name')}
          label="Nome:"
          className="col-span-1"
        />
        <Input
          disabled={loading}
          value={formik.values.email}
          onError={formik.errors.email}
          onChange={formik.handleChange('email')}
          label="Email:"
          className="col-span-1"
        />
        <Input
          disabled={loading}
          value={formik.values.document}
          onError={formik.errors.document}
          onChange={(v) => formik.setFieldValue('document', formattedCPF(v))}
          label="CPF:"
          className="col-span-1"
        />
        <SelectDate
          value={formik.values.hireDate as any}
          onChange={(v) => formik.setFieldValue('hireDate', v)}
          label="Data de Contratação:"
          className="col-span-1"
        />

        <span className="col-span-2 mt-4 mb-2 border-b pb-2">Endereço</span>
        <Input
          disabled={loading}
          value={formik.values.street}
          onError={formik.errors.street}
          onChange={formik.handleChange('street')}
          label="Rua:"
          className="col-span-2"
        />
        <Input
          disabled={loading}
          value={formik.values.zipCode}
          onError={formik.errors.zipCode}
          onChange={(v) => formik.setFieldValue('zipCode', formattedCEP(v))}
          label="CEP:"
        />
        <Input
          disabled={loading}
          value={formik.values.neighborhood}
          onError={formik.errors.neighborhood}
          onChange={formik.handleChange('neighborhood')}
          label="Bairro:"
        />
        <Select
          disabled={loading}
          value={formik.values.state}
          onError={formik.errors.state}
          onChange={formik.handleChange('state')}
          label="Estado:"
          options={statesOfBrazil}
        />
        <Input
          disabled={loading}
          value={formik.values.city}
          onError={formik.errors.city}
          onChange={formik.handleChange('city')}
          label="Cidade:"
        />

        <div className="col-span-2 mt-6 mb-2 border" />

        <div className="col-span-1 col-start-2 flex gap-4">
          <Button disabled={loading} className="h-10 w-full" variant="secondary" label="Cancelar" />
          <Button
            isLoading={loading}
            onClick={() => formik.handleSubmit()}
            className="h-10"
            label="Salvar"
          />
        </div>
      </form>
    </div>
  );
};
