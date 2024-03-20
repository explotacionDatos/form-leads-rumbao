import React, { useEffect, useState, useRef } from "react";
import {
  animate,
  delay,
  easeInOut,
  filterProps,
  motion,
  useAnimation,
} from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import taller from "../components/taller.json";
import { sendFormRequest } from "../api/rumbao.api";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  //estado de enviado y input matricula
  const [send, setSend] = useState(2);
  const [inputValue, setInputValue] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  //regex para validar campo matricula
  const regex = /^[a-zA-Z0-9]{0,10}$/;

  const regexNumber = /^\d*$/;

  //animaciones
  const loader = useAnimation();
  const appearMsg = useAnimation();
  const matricula = useAnimation();
  const numberA = useAnimation();
  //evento onChange del campo matricula
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  //evento onChange del campo telefono
  const handleInputTelefono = (event) => {
    setInputPhone(event.target.value);
  };
  //CHECKLIST TALLER------------------------------------------------------------------------
  const items = taller.data;


  //ORIGEN BDC
  const itemsBDC = items.map((item) => {
    if (item.id <= 12) {
      return (
        <div className="mv__items" key={item.id}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <input {...field} type="radio" value={item.title}></input>
            )}
          />


          <label htmlFor={item.title}>{item.title}</label>
        </div>
      );
    }
  });
  //ORIGEN POSTVENTA
  const itemsPostventa = items.map((item) => {
    if (item.id >= 13) {
      return (
        <div className="mv__items" key={item.id}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <input {...field} type="radio" value={item.title}></input>
            )}
          />
          <label htmlFor={item.title}>{item.title}</label>
        </div>
      );
    }
  });
  //----------------------------------------------------------------------------------------
  //Evento onsubmit para enviar formulario -------------------------------------------------

  const onSubmit = async (data) => {
    const obj = taller.data.filter((combo) => combo.title == data.title);
    loader.start({
      opacity: 1,
      rotate: [50, 180, 360, 0],
      transition: { duration: 1, ease: "linear", repeat: Infinity },
    });
    const params = {
      phoneNumber: data.telefono_cliente,
      campaignId: obj[0].campaignId,
      priorityGroupId: obj[0].priorityGroupId,
      nombre: data.nombre_cliente,
      aux1: data.matricula,
      aux9: data.observacion + " --- " + data.usuario_BDC,
    };
    console.log(params);
    try {
      //realizo el envio del formulario
      const sendForm = await sendFormRequest(params);
      console.log(sendForm);
      setSend(1);
    } catch (error) {
      console.log("Error: " + error.message);
      setSend(0);
    }
  };
  //--------------------------------------------------------------------------------
  const [status, setStatus] = useState(0);
  const form = useRef(null);

  //verificar que el estado de enviado haya cambiado--------------------------------
  useEffect(() => {
    if (regex.test(inputValue) == false) {
      matricula.start({
        borderColor: "#ff544",
      });
    } else {
      matricula.start({
        borderColor: "#00b2e0",
      });
    }
    if (regexNumber.test(inputPhone) == false) {
      numberA.start({
        borderColor: "#ff544",
      });
    } else {
      numberA.start({
        borderColor: "#00b2e0",
      });
    }

    if (send == 1) {
      setStatus(1);
      loader.start({ opacity: 0 });
      appearMsg.start({
        opacity: [0, 1, 1, 1, 1, 0],
        y: [10, 0, 0, 0, 0, 0, 0],
        x: [0, 0, 0, 0, 0, 10],
        transition: { duration: 4, ease: easeInOut, delay: 0.5 },
      });
      form.current.reset();
      setTimeout(() => {
        setStatus(2);
        setSend(2);
      }, 4600);
    }

    if (send == 0) {
      setStatus(0);
      loader.start({ opacity: 0 });
      appearMsg.start({
        opacity: [1, 1, 1, 0],
        transition: { duration: 2, ease: easeInOut, delay: 0.5 },
      });
      form.current.reset();
      setTimeout(() => {
        setStatus(2);
        setSend(2);
      }, 2200);
    }
  }, [send, status, inputValue, inputPhone]);
  //------------------------------------------------------------------------------------------
  //elementos render--------------------------------------------------------------------------
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="form"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "circInOut" }}
      ref={form}
    >
      <div className="form__status">
        <span className="material-symbols-outlined form__status__icon">
          description
        </span>
        {status == 2 && (
          <div className="form__status__none">
            <span className="material-symbols-outlined">check_circle</span>
            <p>Esperando acción</p>
          </div>
        )}
        {status == 1 && (
          <motion.div
            className="form__status__ok"
            initial={{ y: 10, opacity: 0 }}
            animate={appearMsg}
          >
            <span className="material-symbols-outlined">check_circle</span>
            <p>Enviado con exito</p>
          </motion.div>
        )}
        {status == 0 && (
          <motion.div
            className="form__status__error"
            initial={{ opacity: 0 }}
            animate={appearMsg}
          >
            <span className="material-symbols-outlined">check_circle</span>
            <p>Error al enviar el formulario</p>
          </motion.div>
        )}
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="nombre_cliente">Nombre de cliente:</label>
          {errors.nombre_cliente?.type === "required" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </motion.div>
          )}
        </div>

        <input
          type="text"
          {...register("nombre_cliente", { required: true })}
          placeholder="Nombre de cliente"
          className="form__items__input"
        ></input>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="telefono_cliente">Teléfono de cliente:</label>
          {errors.telefono_cliente?.type === "required" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </motion.div>
          )}
          {errors.telefono_cliente?.type === "pattern" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>Número no válido</p>
            </motion.div>
          )}
        </div>

        <motion.input
          type="text"
          {...register("telefono_cliente", {
            required: true,

            pattern: /^\d*$/,
          })}
          placeholder="Teléfono"
          className="form__items__input"
          onChange={handleInputTelefono}
          animate={numberA}
        ></motion.input>


        <span className="form__items__tooltip">
          Usar 00+CODIGO PAIS+NUMERO (sin espacios ni simbolos) ej.
          0034620527172
        </span>


      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="matricula">Matrícula:</label>
          {errors.matricula?.type === "required" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </motion.div>
          )}
          {errors.matricula?.type === "pattern" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>No se admiten caracteres especiales</p>
            </motion.div>
          )}
        </div>

        <motion.input
          type="text"
          {...register("matricula", {
            required: true,
            pattern: /^[a-zA-Z0-9]{0,10}$/,
          })}
          placeholder="Matrícula"
          maxLength={10}
          className="form__items__input"
          animate={matricula}
          onChange={handleInputChange}
        ></motion.input>
      </div>
      {/*-----------------------------TALLER----------------------------------------*/}
      <div className="form__items form__items--cl">
        <div className="form__items__lbl form__items__lbl--cbox">
          <label htmlFor="taller">Taller:</label>
          {errors.title?.type === "required" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </motion.div>
          )}
        </div>
        <div className="mv">
          <div className="mv__ctnr">
            <fieldset className="mv__ctnr__fset">
              <legend>ORIGEN BDC</legend>
              {itemsBDC}
            </fieldset>
            <fieldset className="mv__ctnr__fset">
              <legend>ORIGEN POSTVENTA</legend>
              {itemsPostventa}
            </fieldset>
          </div>
        </div>
      </div>
      {/*-----------------------------TALLER----------------------------------------*/}
      {/*-----------------------------MOTIVO VISITA---------------------------------*/}


      {/*<div className="form__items">


        <div className="form__items__lbl">
          <label htmlFor="motivo_visita">Motivo de visita:</label>
          {errors.motivo_visita?.type === "required" && (
            <div className="form__items__errors">
              <span className="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <select
          {...register("motivo_visita", { required: true })}
          className="form__items__slct"
        >
          <option value="">Seleccionar Motivo...</option>
          <option value="Medida de Servicio">Medida de Servicio</option>
          <option value="Revisión y mantenimiento">
            Revisión y mantenimiento
          </option>
          <option value="Solicitud presupuesto mantenimiento">
            Solicitud presupuesto mantenimiento
          </option>
          <option value="Diagnosis o averias">Diagnosis o averias</option>
          <option value="Peritación carrocería">Peritación carrocería</option>
          <option value="Consulta o duda taller mecánica">
            Consulta o duda taller mecánica
          </option>
          <option value="Consulta o duda taller carrocería">
            Consulta o duda taller carrocería
          </option>
          <option value="Segunda cita tras llegada de recambios">
            Segunda cita tras llegada de recambios
          </option>
          <option value="Segunda cita tras solución técnica DISS">
            Segunda cita tras solución técnica DISS
          </option>
          <option value="Segunda cita para prueba dinámica con técnico">
            Segunda cita para prueba dinámica con técnico
          </option>
          <option value="Segunda cita autorización aseguradora">
            Segunda cita autorización aseguradora
          </option>
        </select>

      </div>*/}


      {/*-----------------------------MOTIVO VISITA---------------------------------*/}
      {/*-----------------------------OBSERVACIONES---------------------------------*/}
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="observacion">Observaciones BDC:</label>
        </div>

        <textarea
          type="text"
          {...register("observacion")}
          rows="7"
          placeholder="Observación"
          className="form__items__input form__items__lbl--textarea"
          maxLength={500}
        ></textarea>
      </div>
      {/*-----------------------------OBSERVACIONES---------------------------------*/}
      {/*-----------------------------USUARIO BDC-----------------------------------*/}
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="usuario_BDC">Usuario BDC:</label>
          {errors.usuario_BDC?.type === "required" && (
            <motion.div
              className="form__items__errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </motion.div>
          )}
        </div>

        <input
          className="form__items__input"
          type="text"
          {...register("usuario_BDC", { required: true })}
          placeholder="Usuario BDC"
        />
      </div>
      {/*-----------------------------USUARIO BDC-----------------------------------*/}
      <div className="form-btn">
        <motion.button
          className="form-btn__submit"
          initial={{ opacity: 0.7, scale: 1 }}
          whileHover={{
            scale: 1.08,
            opacity: 1,
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          Enviar
        </motion.button>
        <motion.div
          className="form-btn__loader"
          initial={{ rotate: 0, opacity: 0 }}
          animate={loader}
        ></motion.div>
      </div>
    </motion.form>
  );
};

export default Form;
