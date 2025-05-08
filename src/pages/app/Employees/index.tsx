import { collection, onSnapshot } from 'firebase/firestore';
import { NotebookPen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/Button';
import { DataTable } from '@/components/DataTable';
import { Input } from '@/components/Input';
import { useMessages } from '@/hook/useMessages';
import { IEmployees } from '@/models/employees';
import { FIREBASE, ROUTES } from '@/paths';
import { dbFirestore } from '@/service/firebase/configs';
import { deleteEmployee } from '@/service/firebase/firestore/employees';
import { getFirebaseErrorMessageTranslation } from '@/service/firebase/translate';

import { employeesColumns } from './types';

export const Employees = () => {
  const navigate = useNavigate();
  const { onShowMessage } = useMessages();

  const [data, setData] = useState<Array<IEmployees>>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const querySnapshot = onSnapshot(
      collection(dbFirestore, FIREBASE.COLLECTIONS.EMPLOYEES),
      (snapshot) => {
        const employees: Array<IEmployees> = [];

        snapshot.forEach((doc) => {
          employees.push({
            id: doc.id,
            ...doc.data(),
          } as IEmployees);
        });

        setData(employees);
      },
    );

    return () => querySnapshot();
  }, []);

  const handleDeleteEmployees = async (employeeId: string) => {
    await deleteEmployee(employeeId).catch((err) => {
      onShowMessage({
        title: 'Atenção!',
        buttonText: 'Ok',
        description: getFirebaseErrorMessageTranslation(
          err,
          'Não foi possivel remover este funcionarios',
        ),
        isVisible: true,
        type: 'MESSAGE',
      });
    });
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-12 items-end gap-4">
        <Input value={search} onChange={setSearch} className="col-span-9" label="Pesquisar" />
        <Button
          onClick={() => navigate(ROUTES.AUTHENTICATED.EMPLOYEES_DETAILS)}
          label="Cadastrar"
          className="col-span-3 h-10"
        />
      </div>

      <div className="flex w-full flex-1">
        <div className="h-full w-full rounded-lg border bg-white">
          <DataTable
            data={data.filter(
              (v) =>
                v.email.toLowerCase().includes(search.toLowerCase()) ||
                v.name.toLowerCase().includes(search.toLowerCase()) ||
                v.document.toLowerCase().includes(search.toLowerCase()),
            )}
            columns={employeesColumns}
            pagination
            onAction={(row) => {
              return (
                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <NotebookPen
                      onClick={() =>
                        navigate(`${ROUTES.AUTHENTICATED.EMPLOYEES_DETAILS}?id=${row.id}`)
                      }
                      className="size-5 cursor-pointer text-slate-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Trash2
                      onClick={() =>
                        onShowMessage({
                          isVisible: true,
                          type: 'QUESTION',
                          onConfirm: () => handleDeleteEmployees(row.id),
                          title: 'Atenção!',
                          messageType: 'error',
                          description: 'Deseja realmente remover este funcionario?',
                        })
                      }
                      className="size-5 cursor-pointer text-slate-500"
                    />
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
