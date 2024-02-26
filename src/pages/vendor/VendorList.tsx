import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeVendor, saveVendor, searchVendors } from './VendorApi';
import Vendor from './Vendor';

const VendorList: React.FC = () => {

  const { name } = useParams<{ name: string; id: string;}>();
  const [clientes, setClientes] = useState<Vendor[]>([]);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    search();
  }, [location.pathname]);
  
  const search = () => {
    let result = searchVendors();
    setClientes(result);
  }

  const remove = (id:string) => {

    removeVendor(id);
    search();

  }

  

  const addVendor = () => {
    history.push('vendor/new');
}

const editVendor = (id:string) => {
  history.push('vendor/' + id);
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
            <IonButton onClick={addVendor} color="primary" fill="solid" slot="end" size="default">
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
          clientes.map((cliente:Vendor) =>
            <IonRow >
          <IonCol>{cliente.firstname}{cliente.lastname}</IonCol>
          <IonCol>{cliente.email}</IonCol>
          <IonCol>{cliente.phone}</IonCol>
          <IonCol>{cliente.address}</IonCol>
          <IonCol>
            <IonButton onClick={() => editVendor(String(cliente.id))} fill="clear" color="primary">
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

export default VendorList;
