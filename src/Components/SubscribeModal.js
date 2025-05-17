import { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { getSpecialTextColorClass } from "../Common/Utils";
import { HYDRA_API_SUBSCRIBE_URL } from "../Common/Endpoints";
import { postRequest } from "../Common/Api";
import { set } from "lodash";

const SubscribeModal = ({ show, handleClose }) => {
  const EMPTY_EMAIL = "EE";
  const INVALID_EMAIL = "IE";
  const API_CALL_FAILED = "ACF";
  const EMAIL_ALREADY_SUBSCRIBED = "EAS";
  const EMAIL_SUCCESSFULLY_SUBSCRIBED = "ESS";
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setSuccess(null);
    setEmail(null);
  }, [show]);

  useEffect(() => {
    if (error) {
      setSuccess(null);
    }
  }, [error])

  const checkEmailValidation = (email) => {
    if (email === "") {
      setError(EMPTY_EMAIL);
      setEmail(null);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError(INVALID_EMAIL);
      setEmail(null);
    } else {
      setError(null);
      setEmail(email);
    }
  }

  const subscribeButtonHandler = async () => { 
    if (email == null) {
      checkEmailValidation(email);
    } else {
      const requestBody = {
        email: email,
        category: "project",
      };
      setLoading(true);
      const response = await postRequest(HYDRA_API_SUBSCRIBE_URL, requestBody);
      setLoading(false);

      if (response.ok) {
        setError(null);
        setSuccess(EMAIL_SUCCESSFULLY_SUBSCRIBED);
      } else if (response.status === 403) { 
        setError(EMAIL_ALREADY_SUBSCRIBED);
      } else {
        setError(API_CALL_FAILED);
      }
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={getSpecialTextColorClass()}>
              Subscribe for Updates
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Subscribe to my newsletter to get updates on my latest projects and paintings!
          <div class="mt-3"/>
          Enter your email address below to subscribe.
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              placeholder="iamawesome@gmail.com"
              aria-label="iamawesome@gmail.com"
              aria-describedby="basic-addon2"
              isInvalid={!!error}
              isValid={!error && success === EMAIL_SUCCESSFULLY_SUBSCRIBED}
              onChange={(e) => {
                const email = e.target.value;
                checkEmailValidation(email);
              }}
            />
            <Button 
              id="button-addon2"
              variant="outline-secondary" 
              onClick={() => subscribeButtonHandler()}
              disabled={loading}
            >
              { loading ? 
                <div class="spinner-border spinner-border-sm" role="status" /> : 
                "Subscribe" 
              }
            </Button>
            {error === EMPTY_EMAIL && 
              <Form.Control.Feedback type="invalid">
                You must enter an email address.
              </Form.Control.Feedback>
            }
            {error === INVALID_EMAIL && 
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            }
            {error === EMAIL_ALREADY_SUBSCRIBED && 
              <Form.Control.Feedback type="invalid">
                Seems like you have already subscribed with this email address.
              </Form.Control.Feedback>
            }
            {error === API_CALL_FAILED && 
              <Form.Control.Feedback type="invalid">
                Oops! Something went wrong. Please try again later.
              </Form.Control.Feedback>
            }
            {success === EMAIL_SUCCESSFULLY_SUBSCRIBED &&
              <Form.Control.Feedback>
                Successfully subscribed! I'll keep you updated.
              </Form.Control.Feedback>
            }
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SubscribeModal;
