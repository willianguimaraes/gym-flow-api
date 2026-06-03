/**
 * @swagger
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   RegisterDTO:
 *     type: object
 *     required: [nome, usuario, email, senha]
 *     properties:
 *       nome:
 *         type: string
 *         example: Willian Guimarães
 *       usuario:
 *         type: string
 *         example: willian
 *       email:
 *         type: string
 *         example: willian@email.com
 *       senha:
 *         type: string
 *         example: "123456"
 *       celular:
 *         type: string
 *         example: "41999999999"
 *       altura:
 *         type: number
 *         example: 1.78
 *       peso:
 *         type: number
 *         example: 80.5
 *
 *   LoginDTO:
 *     type: object
 *     required: [usuario, senha]
 *     properties:
 *       usuario:
 *         type: string
 *         example: willian
 *       senha:
 *         type: string
 *         example: "123456"
 */