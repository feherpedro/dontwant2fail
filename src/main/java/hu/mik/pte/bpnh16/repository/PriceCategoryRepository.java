package hu.mik.pte.bpnh16.repository;

import hu.mik.pte.bpnh16.domain.PriceCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PriceCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PriceCategoryRepository extends JpaRepository<PriceCategory, Long> {

}
