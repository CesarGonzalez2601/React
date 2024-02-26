import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';
import Customer from './Customer';

const CustomerList: React.FC = () => {

  const { name } = useParams<{ name: string; id: string;}>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    search();
  }, [location.pathname]);
  
  const search = () => {
    let result = searchCustomers();
    setClientes(result);
  }

  const remove = (id:string) => {

    removeCustomer(id);
    search();

  }

  

  const addCustomer = () => {
    history.push('customer/new');
}

const editCustomer = (id:string) => {
  history.push('customer/' + id);
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
          <IonTitle>Gestion de Clientes</IonTitle>
          <IonItem>
            <IonButton onClick={addCustomer} color="primary" fill="solid" slot="end" size="default">
            <IonIcon icon={add}/>
              Agregar Cliente
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
          clientes.map((cliente:Customer) =>
            <IonRow >
          <IonCol>{cliente.firstname}{cliente.lastname}</IonCol>
          <IonCol>{cliente.email}</IonCol>
          <IonCol>{cliente.phone}</IonCol>
          <IonCol>{cliente.address}</IonCol>
          <IonCol>
            <IonButton onClick={() => editCustomer(String(cliente.id))} fill="clear" color="primary">
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

export default CustomerList;
