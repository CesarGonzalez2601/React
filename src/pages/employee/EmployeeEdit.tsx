import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { saveEmployee, searchEmployeeById, searchEmployees } from './EmployeeApi';
import { checkmark } from 'ionicons/icons';
import Employee from './Employee';

const EmployeeEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string; }>();
  const [employee, setEmployee] = useState<Employee>({});

  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== 'new'){
      let result = searchEmployeeById(id);
      setEmployee(result);
    }

    // Implementa la lógica de búsqueda si es necesario
  }

  const save = () => {
    saveEmployee(employee);
    search;
    history.push('/folder/employees');
  }

  const handleInputChange = (key: string, value: string) => {
    setEmployee((prevEmployee: any) => ({
      ...prevEmployee,
      [key]: value
    }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('firstname', e.detail.value!)}
                  label="First Name"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={employee.firstname}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('lastname', e.detail.value!)}
                  label="Last Name"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={employee.lastname}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('email', e.detail.value!)}
                  label="Email"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={employee.email}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('address', e.detail.value!)}
                  label="Address"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={employee.address}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('phone', e.detail.value!)}
                  label="Phone"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={employee.phone}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
              <IonIcon icon={checkmark} />
              Guardar Empleado
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;

