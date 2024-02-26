import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { saveVendor, searchVendorById, searchVendors } from './VendorApi';
import { checkmark } from 'ionicons/icons';
import Vendor from './Vendor';

const VendorEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string; }>();
  const [vendor, setVendor] = useState<Vendor>({});

  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== 'new'){
      let result = searchVendorById(id);
      setVendor(result);
    }

    // Implementa la lógica de búsqueda si es necesario
  }

  const save = () => {
    saveVendor(vendor);
    search;
    history.push('/folder/vendors');
  }

  const handleInputChange = (key: string, value: string) => {
    setVendor((prevVendor: any) => ({
      ...prevVendor,
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
          <IonTitle>{id === 'new' ? 'Agregar Vendedor' : 'Editar Vendedor'}</IonTitle>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  onIonChange={e => handleInputChange('firstname', e.detail.value!)}
                  label="First Name"
                  labelPlacement="stacked"
                  placeholder="Enter text"
                  value={vendor.firstname}
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
                  value={vendor.lastname}
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
                  value={vendor.email}
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
                  value={vendor.address}
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
                  value={vendor.phone}
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

export default VendorEdit;

