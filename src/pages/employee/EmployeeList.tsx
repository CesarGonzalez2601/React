import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeEmployee, saveEmployee, searchEmployees } from './EmployeeApi';
import Employee from './Employee';

const EmployeeList: React.FC = () => {

  const { name } = useParams<{ name: string; id: string;}>();
  const [clientes, setClientes] = useState<Employee[]>([]);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    search();
  }, [location.pathname]);
  
  const search = () => {
    let result = searchEmployees();
    setClientes(result);
  }

  const remove = (id:string) => {

    removeEmployee(id);
    search();

  }

  

  const addEmployee = () => {
    history.push('employee/new');
}

const editEmployee = (id:string) => {
  history.push('employee/' + id);
}

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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonTitle>Gestion de Empleados</IonTitle>
          <IonItem>
            <IonButton onClick={addEmployee} color="primary" fill="solid" slot="end" size="default">
            <IonIcon icon={add}/>
              Agregar Empleado
            </IonButton>
          </IonItem>
        <IonGrid className="table">
        <IonRow >
          <IonCol>Nombre</IonCol>
          <IonCol>Email</IonCol>
          <IonCol>Telefono</IonCol>
          <IonCol>Direccion</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>
        {
          clientes.map((cliente:Employee) =>
            <IonRow >
          <IonCol>{cliente.firstname}{cliente.lastname}</IonCol>
          <IonCol>{cliente.email}</IonCol>
          <IonCol>{cliente.phone}</IonCol>
          <IonCol>{cliente.address}</IonCol>
          <IonCol>
            <IonButton onClick={() => editEmployee(String(cliente.id))} fill="clear" color="primary">
              <IonIcon icon={pencil} slot="icon-only"/>
            </IonButton>
            <IonButton onClick={() => remove(String(cliente.id))} fill="clear" color="danger">
              <IonIcon icon={close} slot="icon-only"/>
            </IonButton>
          </IonCol>
        </IonRow>
            )
        }
      </IonGrid>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
