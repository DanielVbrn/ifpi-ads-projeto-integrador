import { ILike } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Equipments } from "../entity/Equipments";
import { Request, Response } from "express";

export const getEquipments = async (request:Request, response:Response) => {
    const equipments = await AppDataSource.getRepository(Equipments).find(request.body)
    if(equipments === null){
        return response.status(404).json({message:"Não há equipamentos disponíveis."})
    }
    return response.json(equipments)
}

export const getEquipmentsById = async (request:Request, response:Response) => {
    const {id}  = request.params
    const equipmentId = Number(id)
    const equipment = await AppDataSource.getRepository(Equipments).findOneBy({id:equipmentId})
    if(equipment.id === null){
        return response.status(404).json({message:"Equipamento não encontrado."})
    }
    return response.json(equipment)
}


export const getEquipmentsByName = async (request: Request, response: Response) => {
    const {nome} = request.params;
    const equipmentRepository = AppDataSource.getRepository(Equipments);
    const equipmentQuery = await equipmentRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  
    if (equipmentQuery.length === 0) {
      return response.status(404).json({ message: "Equipamento não encontrado." });
    }
  
    return response.json(equipmentQuery);
  }



  export const saveEquipments = async (request:Request, response:Response) => {
      const equipments = await AppDataSource.getRepository(Equipments).save(request.body )
      response.json(equipments)
    }


export const deleteEquipments = async (request: Request, response: Response) => {
    const {id} = request.params
    const equipmentId = Number(id)
    const equipments = await AppDataSource.getRepository(Equipments).delete({id:equipmentId})
    if(equipments.affected === 1) {
        const equipmentDelete = await AppDataSource.getRepository(Equipments).findOneBy({id:equipmentId})
        return response.json(equipmentDelete,).status(200).json({message:"Equipamento removido."})
    } 
    return response.status(404).json({message:"Equipamento não encontrado"})
};

export const updateEquipments = async (request:Request, response:Response) => {
    const {id} = request.params
    const equipmentId = Number(id)
    const equipments = await AppDataSource.getRepository(Equipments).update({id:equipmentId},request.body)
    if(equipments.affected === 1) {
        const equipmentUpdate = await AppDataSource.getRepository(Equipments).findOneBy({id:equipmentId})
        return response.json(equipmentUpdate)
    }
    return response.status(404).json({message:"Equipamento não encontrado."})
}
