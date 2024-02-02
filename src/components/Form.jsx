import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import taller from "../components/taller.json";
import { sendFormRequest } from "../api/rumbao.api";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [send, setSend] = useState(false);
  //evento onsubmit para enviar formulario
  const onSubmit = async (data) => {
    const obj = taller.data.filter((combo) => combo.campaignId == data.taller);

    const params = {
      phoneNumber: data.telefono_cliente,
      campaignId: obj[0].campaignId,
      priorityGroupId: obj[0].priorityGroupId,
      nombre: data.nombre_cliente,
      aux1: data.matricula,
      aux3: data.motivo_visita,
      aux9: data.observacion + " --- " + data.usuario_BDC,
    };
    console.log(params);
    //realizo el envio del formulario
    const sendForm = await sendFormRequest(params);
    if (sendForm) {
      setSend(true);
    } else {
      setSend(false);
    }
  };
  useEffect(() => {});
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="nombre_cliente">Nombre de Cliente:</label>
          {errors.nombre_cliente?.type === "required" && (
            <div className="form__items__errors">
              <span class="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <input
          type="text"
          {...register("nombre_cliente", { required: true })}
          placeholder="Nombre de Cliente"
          className="form__items__input"
        ></input>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="telefono_cliente">Telefono de Cliente:</label>
          {errors.telefono_cliente?.type === "required" && (
            <div className="form__items__errors">
              <span class="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <input
          type="number"
          {...register("telefono_cliente", { required: true })}
          placeholder="Teléfono"
          className="form__items__input"
          autoFocus
        ></input>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="matricula">Matricula:</label>
          {errors.matricula?.type === "required" && (
            <div className="form__items__errors">
              <span class="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <input
          type="text"
          {...register("matricula", { required: true })}
          placeholder="Matricula"
          maxLength={10}
          className="form__items__input"
          autoFocus
        ></input>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="taller">Taller:</label>
          {errors.taller?.type === "required" && (
            <div className="form__items__errors">
              <span class="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <select
          {...register("taller", { required: true })}
          className="form__items__slct"
        >
          <option value={taller.data[0].campaignId}>VIGO AUDI - Cita</option>
          <option value={taller.data[1].campaignId}>VIGO VW - Cita</option>
          <option value={taller.data[2].campaignId}>VIGO LCV - Cita</option>
          <option value={taller.data[3].campaignId}>
            VILAGARCIA AUDI - Cita
          </option>
          <option value={taller.data[4].campaignId}>
            VILAGARCIA VW - Cita
          </option>
        </select>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="motivo_visita">Motivo de visita:</label>
          {errors.motivo_visita?.type === "required" && (
            <div className="form__items__errors">
              <span class="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <select
          {...register("motivo_visita", { required: true })}
          className="form__items__slct"
        >
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
        </select>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="observacion">Observaciones BDC:</label>
        </div>

        <textarea
          type="text"
          {...register("observacion")}
          rows="3"
          placeholder="Observación"
          className="form__items__input form__items__lbl--textarea"
          maxLength={140}
        ></textarea>
      </div>
      <div className="form__items">
        <div className="form__items__lbl">
          <label htmlFor="usuario_BDC">Usuario BDC:</label>
          {errors.usuario_BDC?.type === "required" && (
            <div className="form__items__errors">
              <span class="material-symbols-outlined">report</span>
              <p>Campo obligatorio</p>
            </div>
          )}
        </div>

        <input
          className="form__items__input"
          type="text"
          {...register("usuario_BDC", { required: true })}
          maxLength={4}
          placeholder="Usuario BDC"
        />
      </div>
      <div className="form-btn">
        <motion.button
          className="form-btn__submit"
          initial={{ opacity: 0.7, y: 0 }}
          whileHover={{
            y: -5,
            opacity: 1,
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          Enviar
        </motion.button>
      </div>
    </form>
  );
};

export default Form;
