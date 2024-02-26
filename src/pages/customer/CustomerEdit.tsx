import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { saveCustomer, searchCustomerById, searchCustomers } from './CustomerApi';
import { checkmark } from 'ionicons/icons';

const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string; }>();
  const [customer, setCustomer] = useState<any>({ firstname: '', lastname: '', email: '', address: '', phone: '' });

  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== 'new'){
      let result = searchCustomerById(id);
      setCustomer(result);
    }

    // Implementa la lógica de búsqueda si es necesario
  }

  const save = () => {
    saveCustomer(customer);
    search;
    history.push('/folder/customers');
  }

  const handleInputChange = (key: string, value: string) => {
    setCustomer((prevCustomer: any) => ({
      ...prevCustomer,
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
          <IonTitle>{id === 'new' ? 'Agregar Cliente' : 'Editar Cliente'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('firstname', e.detail.value!)}
                  label="First Name"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={customer.firstname}
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
                  value={customer.lastname}
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
                  value={customer.email}
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
                  value={customer.address}
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
                  value={customer.phone}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
              <IonIcon icon={checkmark} />
              Guardar Cliente
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;

