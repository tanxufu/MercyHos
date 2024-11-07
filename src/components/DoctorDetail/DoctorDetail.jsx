import { useParams } from 'react-router-dom';
import { Card, Descriptions } from 'antd';
import { getDoctor } from '../../apis/doctor.api';
import { useState, useEffect } from 'react';

function DoctorDetail () {
    const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const data = await getDoctor(id);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }
    return ( 
        <Card title={doctor.name}>
      <Descriptions bordered>
        <Descriptions.Item label="Specialty">{doctor.specialty}</Descriptions.Item>
        <Descriptions.Item label="Experience">{doctor.experience}</Descriptions.Item>
        <Descriptions.Item label="Contact">
          {doctor.email} | {doctor.phone}
        </Descriptions.Item>
      </Descriptions>
    </Card>
     );
}

export default DoctorDetail;