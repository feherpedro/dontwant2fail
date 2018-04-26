package hu.mik.pte.bpnh16.service.mapper;

import hu.mik.pte.bpnh16.domain.*;
import hu.mik.pte.bpnh16.service.dto.DictionaryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Dictionary and its DTO DictionaryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DictionaryMapper extends EntityMapper<DictionaryDTO, Dictionary> {



    default Dictionary fromId(Long id) {
        if (id == null) {
            return null;
        }
        Dictionary dictionary = new Dictionary();
        dictionary.setId(id);
        return dictionary;
    }
}
