import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';

const CustomerList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<any>([]);
  
  useEffect(()=> {
    search();
  }, []);
  
  const search = () => {
  
    let result = searchCustomers();
    setClientes(result);

  }

  const remove = (id:string) => {

    removeCustomer(id);
    search();

  }

  const pruebaLocalStorage = () => {
    const ejemplo = {
      id:'1',
      fistname:'Cesar',
      lastname:'Gonzalez',
      email:'cesar1234',
      phone:'72727272',
      address:'sadsadasd'
    }

    saveCustomer(ejemplo);
    search();
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
            <IonButton color="primary" fill="solid" slot="end" size="default">
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
          clientes.map((cliente:any) =>
            <IonRow >
          <IonCol>{cliente.firstname}{cliente.lastname}</IonCol>
          <IonCol>{cliente.email}</IonCol>
          <IonCol>{cliente.phone}</IonCol>
          <IonCol>{cliente.addres}</IonCol>
          <IonCol>
            <IonButton fill="clear" color="primary">
              <IonIcon icon={pencil} slot="icon-only"/>
            </IonButton>
            <IonButton onClick={() => remove(cliente.id)} fill="clear" color="danger">
              <IonIcon icon={close} slot="icon-only"/>
            </IonButton>
          </IonCol>
        </IonRow>
            )
        }
      </IonGrid>
      </IonCard>

      <IonButton onClick={pruebaLocalStorage} fill="clear" color="danger">Prueba local Storage
              <IonIcon icon={close} slot="icon-only"/>
            </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
