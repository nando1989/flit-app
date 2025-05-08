import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import { ToggleStatusIndicator } from '@/components/ToggleStatus';
import { formatFirebaseDateToDate } from '@/lib/utils';
import { IEmployees } from '@/models/employees';

export const schemaValidationFormEmployees = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  document: Yup.string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00'),
  hireDate: Yup.date()
    .required('Data de contratação é obrigatória')
    .typeError('Data de contratação inválida'),
  street: Yup.string().required('Rua é obrigatória'),
  zipCode: Yup.string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 00000-000'),
  neighborhood: Yup.string().required('Bairro é obrigatório'),
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatório'),
});

export const employeesColumns: Array<ColumnDef<IEmployees>> = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      return <ToggleStatusIndicator isActive={row.row.original.isActive} />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'document',
    header: 'CPF',
  },
  {
    accessorKey: 'hireDate',
    header: 'Data da Contratação',
    cell: (cell) => {
      return `${dayjs(formatFirebaseDateToDate(cell.row.original.hireDate)).format('DD/MM/YYYY')}`;
    },
  },
];

export const initFormEmployees = {
  isActive: true,
  name: '',
  email: '',
  document: '',
  street: '',
  zipCode: '',
  neighborhood: '',
  city: '',
  state: '',
  hireDate: '',
};
