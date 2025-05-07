import { collection, onSnapshot } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { NotebookPen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/Button';
import { DataTable } from '@/components/DataTable';
import { Input } from '@/components/Input';
import { ToggleStatusIndicator } from '@/components/ToggleStatus';
import { IEmployees } from '@/models/employees';
import { FIREBASE, ROUTES } from '@/paths';
import { dbFirestore } from '@/service/firebase/configs';

import { employeesColumns } from './types';

export const Employees = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Array<IEmployees>>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const querySnapshot = onSnapshot(
      collection(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES),
      (snapshot) => {
        const employees: Array<IEmployees> = [];
        snapshot.forEach((doc) => {
          employees.push(Object.assign(doc.data(), { id: doc.id }) as IEmployees);
        });
        setData(employees);
      },
    );
    return () => querySnapshot();
  }, []);

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteDoc(doc(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES, id));
      alert('Funcionário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
    }
  };

  const filteredData = data.filter(
    (employee) =>
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.document.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-12 items-end gap-4">
        <Input value={search} onChange={setSearch} className="col-span-9" label="Pesquisar" />
        <Button
          onClick={() => navigate(ROUTES.AUTHENTICATED.EMPLOYEES_DETAILS)}
          label="Cadastrar"
          className="col-span-3 h-10"
        />
      </div>

      <div className="flex w-full flex-1">
        <div className="w-full rounded-lg border bg-white">
          <DataTable
            data={filteredData}
            columns={employeesColumns}
            pagination
            onAction={(row) => (
              <div className="flex gap-4">
                <ToggleStatusIndicator isActive={row.Active} />
                <NotebookPen
                  onClick={() => navigate(`${ROUTES.AUTHENTICATED.EMPLOYEES_DETAILS}?id=${row.id}`)}
                  className="size-5 cursor-pointer text-slate-500"
                />
                <Trash2
                  onClick={() => handleDeleteEmployee(row.id)}
                  className="size-5 cursor-pointer text-red-600"
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
