// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { ADMIN_EMAIL } = process.env;

const handler = async (req, res) => {
    res.status(200).end()
};

export default handler;
// export default function handler(req, res) {
//   console.log(req.body)
//   res.status(200).end()
// }
