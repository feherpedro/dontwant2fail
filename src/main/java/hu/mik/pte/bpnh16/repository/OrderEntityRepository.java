package hu.mik.pte.bpnh16.repository;

import hu.mik.pte.bpnh16.domain.OrderEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {

}
