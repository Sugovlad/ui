import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface ErrorShowElementProps {
    errorTexts: string[]
}

const ErrorShowElement: React.FC<ErrorShowElementProps> = ({errorTexts}) => {
    const [show, setShow] = useState(true);

    return (
        <div>  {
            errorTexts.map(user => (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>The error were occurred</Alert.Heading>
                        <p>

                        </p>
                    </Alert>
                )
            )
        }
            <Button onClick={() => setShow(true)}>Show Alert</Button>;
        </div>
    )
}

export default ErrorShowElement;