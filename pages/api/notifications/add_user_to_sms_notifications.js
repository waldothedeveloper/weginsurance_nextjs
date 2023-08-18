import Airtable from "airtable";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: "This endpoint requires a POST request!" });
  }

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appYKfhDIleiAOBEU"
  );

  const { fullname, phone } = req.body;
  // Create a dayjs object for the current date and time
  const currentDateTime = dayjs();

  // Convert the dayjs object to GMT/UTC
  const utcDateTime = currentDateTime.utc().format("YYYY-MM-DD HH:mm:ss");

  base("Projects").create(
    [
      {
        fields: {
          "Nombre y Apellidos": fullname,
          Telefono: phone,
          Fecha: utcDateTime,
          "Acepta Terminos y Condiciones": "YES",
        },
      },
    ],
    (err, records) => {
      if (err) {
        // console.error(err);
        return res
          .status(500)
          .json({ message: `Something went wrong`, status: 500, err });
      }

      if (records) {
        return res.status(200).json({
          message: `User's campaign registered successfully!`,
          status: 200,
        });
      } else {
        return res
          .status(500)
          .json({ message: `Something went wrong`, status: 500 });
      }
    }
  );
}
