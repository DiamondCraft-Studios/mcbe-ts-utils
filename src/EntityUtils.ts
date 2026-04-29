import { Entity, EntityComponentTypes, EquipmentSlot, ItemStack, Player } from "@minecraft/server";

/**
 * Entity utility functions.
 */
export class EntityUtils {
	/**
	 * Checks if the given entity is valid.
	 * @param entity
	 * @returns
	 */
	static isValid(...entities: Entity[]): boolean {
		if (entities.length === 0) throw new Error("No entities provided");
		for (let i = 0; i < entities.length; i++) {
			if (!entities[i]?.isValid) return false;
		}
		return true;
	}
	/**
	 * Triggers an event on the given entity, but catches any exceptions.
	 * @param entity
	 * @param event
	 */
	static triggerEventSafely(event: string, entity: Entity): void {
		try {
			entity?.triggerEvent(event);
		} catch (e) {
			console.warn(`Caught exception while triggering event ${event} on ${entity.typeId}`);
		}
	}
	/**
	 * Checks if the given entity has the given enum property set to the given value.
	 * @param entity
	 * @param property
	 * @param value
	 * @returns
	 */
	static enumPropertyMatches(property: string, value: string, entity: Entity): boolean {
		return entity.getProperty(property) === value;
	}
	/**
	 * Check if the entity is tamed to the player.
	 * Must have "minecraft:is_tamed" component.
	 * @param player The owner to check.
	 * @param entity The entity to check.
	 * @returns
	 */
	static isTamedToPlayer(player: Player, entity: Entity): boolean {
		return (
			(entity.getComponent(EntityComponentTypes.Tameable) || entity.getComponent(EntityComponentTypes.TameMount))
				?.tamedToPlayer === player
		);
	}
	/**
	 * Checks if an entity is riding another entity.
	 * @param rider The entity riding.
	 * @param entity The entity being ridden.
	 */
	static isBeingRiddenBy(rider: Entity, entity: Player): boolean {
		return entity.getComponent(EntityComponentTypes.Riding)?.entityRidingOn === rider;
	}
	/**
	 * Checks if an entity has riders.
	 * @param entity
	 */
	static hasRiders(entity: Entity): boolean {
		const rideable = entity.getComponent(EntityComponentTypes.Rideable);
		return rideable ? rideable.getRiders().length > 0 : false;
	}
	/**
	 * Checks if the owner of a rideable entity is riding it.
	 * @param entity The rideable entity.
	 * @returns
	 */
	static isOwnerRiding(entity: Entity): boolean {
		const owner = this.getOwner(entity);
		if (!owner) return false;
		return this.isBeingRiddenBy(entity, owner);
	}
	/**
	 * Gets the owner of the given entity from "minecraft:tameable" or "minecraft:tame_mount" components.
	 * @param entity
	 * @returns
	 */
	static getOwner(entity: Entity): Player | undefined {
		return (
			entity.getComponent(EntityComponentTypes.Tameable) || entity.getComponent(EntityComponentTypes.TameMount)
		)?.tamedToPlayer;
	}
	/**
	 * Gets the item in the main hand of the entity.
	 * @param entity
	 * @returns
	 */
	static getItemMainhand(entity: Entity): ItemStack | undefined {
		return entity.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand);
	}
	/**
	 * Sets the item in the main hand of the entity.
	 * @param entity
	 * @returns
	 */
	static setItemMainhand(itemStack: ItemStack, entity: Entity): void {
		entity.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Mainhand, itemStack);
	}
	/**
	 * Gets the item in the off hand of the entity.
	 * @param entity
	 * @returns
	 */
	static getItemOffhand(entity: Entity): ItemStack | undefined {
		return entity.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Offhand);
	}
	/**
	 * Sets the item in the off hand of the entity.
	 * @param entity
	 * @returns
	 */
	static setItemOffhand(itemStack: ItemStack, entity: Entity): void {
		entity.getComponent(EntityComponentTypes.Equippable)?.setEquipment(EquipmentSlot.Offhand, itemStack);
	}
}
